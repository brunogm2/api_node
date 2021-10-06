import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import { SurveysRepository } from "../repositories/SurveysRepository";
import { SuverysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailServices from "../services/SendMailServices";

class SendMailController {

    async execute(request: Request, response: Response){
        const { email, surveyes_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUserRepository = getCustomRepository(SuverysUsersRepository);

        const userAleardyExist = await usersRepository.findOne({email});

        if(!userAleardyExist){
            return response.status(400).json({
                error: "Usuario não existente!",
            }); 
        }

        const surveyAlerdyExist = await surveysRepository.findOne({id: surveyes_id});

        if(!surveyAlerdyExist){
            return response.status(400).json({
                error: "Pesquisa não existente!",
            });  
        }

        const surveyUser = surveysUserRepository.create({
            user_id: userAleardyExist.id,
            surveyes_id
        })

        await surveysUserRepository.save(surveyUser);

        await SendMailServices.execute(email, surveyAlerdyExist.title, surveyAlerdyExist.description);


        return response.json(surveyUser);
    }
}

export { SendMailController }