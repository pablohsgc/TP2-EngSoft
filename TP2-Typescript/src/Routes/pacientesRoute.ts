import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import CadastraPaciente from "../Models/CadastraPaciente";
import Paciente from "../Models/Paciente";
import PacienteBD from "../Models/PacienteBD";
import verificaJWT from "../middleware/verificaJWT";

const pacienteRoute = Router();

pacienteRoute.get('/pacientes', verificaJWT, async (req:Request, res:Response,next:NextFunction) =>{
    const pacientes = await PacienteBD.pacientes();
    res.send(pacientes);
})

pacienteRoute.post('/pacientes', verificaJWT, async (req:Request, res:Response,next:NextFunction) => {
    let {nome,email,telefone,cep,logradouro,bairro,cidade,estado,peso,altura,tipoSanguineo} = req.body;
    let paciente = new Paciente(nome,0,email,telefone,cep,logradouro,bairro,cidade,estado,peso,altura,tipoSanguineo);
    let retorno = "";
    
    try{
        let codigo = await CadastraPaciente.cadastraPaciente(paciente);
        retorno = "Paciente: " + nome + ", cadastrado com o codigo: " + codigo;
    }catch(erro){
        retorno = "Paciente não pode ser cadastrado!";
    }

    res.send({"Mensagem":retorno});
})

export default pacienteRoute;

