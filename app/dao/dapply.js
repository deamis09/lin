import {NotFound, Forbidden} from 'lin-mizar';

import {DapplyModel} from "../model/apply";

class Dapply {
    /*新增*/
    static async addDjb(v) {

        return await DapplyModel.create(v)
    }

    /*查询*/
    static async getDjbList() {
        const apply = await DapplyModel.findAll();
        return apply;
    }

    /*编辑*/
    static async editDjbList(id, params) {
        const djb = await DapplyModel.findByPk(id)
        if (!djb) {
            throw  new NotFound()
        }
        return await djb.update({...params})
    }

    /*删除*/
    static async deleteDjbList(id) {

        return await DapplyModel.destroy({
            where: {id}
        })
    }


}

export {Dapply as DapplyDao};
