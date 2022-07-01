import { LinValidator, Rule } from 'lin-mizar';

class AddDjbValidator extends LinValidator {
    constructor () {
        super();
        this.type = [
            new Rule('isNotEmpty', 'typeID不可为空'),
            new Rule('isInt', '必须是数字')
        ];
        this.idcard = [
            new Rule('isNotEmpty', '身份证为空'),
            new Rule('isLength', '身份证必须是1-14之间', 2, 18)
        ];
    }
}
class EditDjbValidator extends LinValidator {
    constructor () {
        super();
        this.id = [
            new Rule('isNotEmpty', 'id不可为空'),
            new Rule('isInt', '必须是数字')
        ];
    }
}
class DeleteDjbValidator extends  LinValidator{
    constructor () {
        super();
        this.id = [
            new Rule('isNotEmpty', 'id不可为空'),
            new Rule('isInt', '必须是数字')
        ];
        this.type = [
            new Rule('isNotEmpty', 'id不可为空'),
            new Rule('isInt', '必须是数字')
        ];
    }
}
export { AddDjbValidator, EditDjbValidator,DeleteDjbValidator };
