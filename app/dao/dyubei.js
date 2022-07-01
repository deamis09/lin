
import { NotFound, Forbidden } from 'lin-mizar';
import {DyubeiModel} from "../model/yubei";

class Dyubei {
    static async addDjb (v) {

        return await  DyubeiModel.create(v)
    }
    static async getDjbList () {
        const xiaofei = await DyubeiModel.findAll();
        return xiaofei;
    }

    static  async editDjbList(id,params){
        const djb = await  DyubeiModel.findByPk(id)
        if (!djb){
            throw  new NotFound()
        }
        return await  djb.update({...params})
    }
    static  async deleteDjbList(id){

        return  await DyubeiModel.destroy({
            where:{id}
        })
    }



}
export { Dyubei as DyubeiDao };
