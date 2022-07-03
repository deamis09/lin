import {Forbidden, LinRouter} from 'lin-mizar';
import {Contentservice} from "../../service/service";
import {groupRequired} from "../../middleware/jwt";
import {AddDjbValidator, DeleteDjbValidator, EditDjbValidator} from "../../validator/dangjian";
import {DjbDao} from "../../dao/djb";
import {DangjianModel} from "../../model/dbj";
import {DyubeiModel} from "../../model/yubei";
import {DapplyModel} from "../../model/apply";
import {logger} from "../../middleware/logger";

const dangjianApi = new LinRouter({
    prefix: "/v1/dangjian",
    module: 'dangjian'
});

dangjianApi.linGet(
    "getdangjian",
    "/",
    dangjianApi.permission('查询'),
    groupRequired,
    async ctx => {
        const dangjian = await Contentservice.getContentList()

        ctx.json(dangjian);
    });
dangjianApi.linPost(
    "adddangjian",
    "/",
    dangjianApi.permission('新增'),
    groupRequired,
    logger("新增了一位党员"),

    async ctx => {
        const v = await new AddDjbValidator().validate(ctx)
        const book = await DangjianModel.findOne({
            where: {
                idcard: v.get('body.idcard')
            }
        });
        const book2 = await DyubeiModel.findOne({
            where: {
                idcard: v.get('body.idcard')
            }
        });
        const book3 = await DapplyModel.findOne({
            where: {
                idcard: v.get('body.idcard')
            }
        });

        if (book, book2, book3) {
            throw new Forbidden({
                code: 10240
            });
        }


        await Contentservice.addContent(v.get('body'))
        ctx.success({
            code: 20000
        })
    }
)
dangjianApi.linPut(
    "editdangjian",
    "/:id",
    dangjianApi.permission('编辑'),
    groupRequired,
    async ctx => {
        const v = await new EditDjbValidator().validate(ctx)
        const id = v.get('path.id')
        const params = v.get('body')
        await Contentservice.editContent(id, params)
        ctx.success({
            code: 20001
        })
    }
)
dangjianApi.linDelete(
    "deletedangjian",
    "/:id",
    dangjianApi.permission('删除'),
    groupRequired,
    async ctx => {
        const v = await new DeleteDjbValidator().validate(ctx)
        const id = v.get('path.id')
        const type = v.get('query.type')
        await Contentservice.deleteContent(id, type)
        ctx.success({
            msg: '删除成功'
        })

    }
)
export {dangjianApi}