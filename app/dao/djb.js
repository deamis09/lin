
import { NotFound, Forbidden } from 'lin-mizar';
import {DangjianModel} from "../model/dbj";


class Djb {
    static async addDjb (v) {

        return await DangjianModel.create(v)
    }
    static async getDjbList(){
      const djblist=  await DangjianModel.findAll();
   return djblist
    }

    static  async editDjbList(id,params){
        const djb = await  DangjianModel.findByPk(id)
        if (!djb){
            throw  new NotFound()
        }
        return await  djb.update({...params})
    }
    static  async deleteDjbList(id){

        return  await DangjianModel.destroy({
            where:{id}
        })
    }



}
export { Djb as DjbDao };
