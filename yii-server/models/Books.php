<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tl_books".
 *
 * @property int $id
 * @property string $name
 * @property string $author
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 't_books';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['bid', 'bname', 'bprice', 'bauth', 'btype', 'bdesc'], 'required'],
            ['bprice', 'number']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => '编码',
            'bname' => '书名',
            'bauth' => '作者',
            'btype' => '分类',
            'bdesc' => '描述'
        ];
    }
}
