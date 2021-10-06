import { Entity, EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SuverysUsersRepository extends Repository<SurveyUser> {}

export { SuverysUsersRepository }