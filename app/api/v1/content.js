import { groupRequired } from '../../middleware/jwt';
import {Forbidden, LinRouter} from 'lin-mizar';

import {AddDjbValidator, DeleteDjbValidator, EditDjbValidator} from '../../validator/dangjian';
import {template} from "@babel/core";
import {logger} from "../../middleware/logger";
import {Contentservice, Dangjianservice} from '../../service/service';

import {DangjianModel} from "../../model/dbj";

const contentApi = new LinRouter({
    prefix: '/v1/dangjian',
    module: '党建'
});
contentApi.linPost(
    'addDjb',
    '/',
    {
        permission: '新增',
        module: '党建管理',

        mount: true
    },
    groupRequired,
    logger("{user.username}新增一位党员信息"),
    async ctx => {
        const v = await new AddDjbValidator.validate(ctx);
        const djb1 = await DangjianModel.findOne({
            where: {
                idcard: v.get('body.idcard')
            }
        });
        if (djb1) {
            throw new Forbidden({
                code: 10240
            });
        }
        await  Contentservice.addContent(v.get('body'))

        ctx.success({
            code:10400
        });
    }
);
contentApi.linGet(
    'getDjbList',
    '/',
    {
        permission: '查询党员明细',
        module: '党建管理',
        mount: true
    },
    groupRequired,
    async ctx => {
        const dangjianList = await Dangjianservice.getDangjianList();
        ctx.json(dangjianList);
    }
);
contentApi.linPut(
    'editDjb',
    '/:id',
    {
        permission: '编辑',
        module: '党建管理',
        mount: true
    },
    groupRequired,
    logger("{user.username},编辑了党员信息"),
    async ctx => {
        const v = await new EditDjbValidator().validate(ctx);
        const id = v.get('path.id');
        const params= v.get('body')
        await  Dangjianservice.editContent(id,params)
        ctx.success({
            code:10401
        });
    }
);
contentApi.linDelete(
    'deleteDjbList',
    '/:id',
    {
        permission: '删除党员明细',
        module: '党建管理',
        mount: true
    },
    groupRequired,
    logger("删除了一条记录"),
    async ctx => {
        const v = await new DeleteDjbValidator().validate(ctx)
        const id = v.get('path.id');
        const type=v.get('query.type')
        await Dangjianservice.deleteContent( id ,type)
        ctx.success({
            code:10402
        })
    }
)
module.exports = { contentApi };
