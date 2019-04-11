<?php
namespace app\models;

use Yii;

//被用于普通模型类的父类并与数据表无关
use yii\base\Model;
//yii\db\ActiveRecord 通常是普通模型类的父类但与数据表有关联

class EntryForm extends Model{
    public $name;
    public $email;

    public function rules(){
        return [
            [
                ['name', 'email'],
                'required'
            ],
            ['email', 'email']
        ];
    }
}