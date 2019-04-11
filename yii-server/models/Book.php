<?php

namespace app\models;

use yii\db\ActiveRecord;

class Book extends ActiveRecord{

    // 显示指定名
    public static function tableName(){
        return 't_books';
    }

    // 表单校验规则
    public function rules(){
        return [
            [['bid', 'bname', 'bprice', 'bauth', 'btype', 'bdesc'], 'required'],
            ['bprice', 'number']
        ];
    }

}