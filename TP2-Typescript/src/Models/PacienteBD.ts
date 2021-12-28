import Paciente from "./Paciente";

const db = require('../db')

class PacienteBD{
    constructor(){

    }

    async pacientes(){
        const query = 'select * from  PESSOA P join Paciente F on P.codigo=F.codigo';
        
        const result = await db.query(query);

        const rows = result.rows;

        return rows || [];
    }

    async inserePaciente(paciente:Paciente){
        let values = [paciente.getCodigo(),paciente.getAltura(),paciente.getTipoSanguineo(),paciente.getPeso()];
        
        const query = 'insert into Paciente (codigo,altura,tipoSanguineo,peso) values ($1,$2,$3,$4) RETURNING codigo';
        
        try{
            const {rows} = await db.query(query,values);
           
            return rows[0].codigo;
        }catch(erro){
            
            throw erro
        }
        
    }
}

export default new PacienteBD();