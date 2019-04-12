<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\data\Pagination;
use app\models\Book;

class BookController extends Controller{

    // 跳转到修改/新增图书页面
    public function actionUpdate($bid = ''){
        $book;
        if($bid !== ''){
            // 修改图书
            $book = Book::findOne($bid);
        }else{
            // 新增图书
            $book = new Book();
            $book -> bid = md5(uniqid());
        }

        //Yii::$app 代表应用实例,能提供 request，response，db等特定功能的组件
        if ($book->load(Yii::$app->request->post()) && $book->validate()) {
            $result = $book -> save();
            console.log($result);
            return json_encode(array('code' => 1, 'msg' => '保存图书信息成功'));
        } else {
            return json_decode($book);
        }
    }

    // 删除指定的图书
    public function actionDelete($bid){
        
        $book = Book::find()
            -> where(['bid' => $bid])
            -> one();
        try{
            $book -> delete();
            return json_encode(array('code' => 1, 'msg' => '删除图书['. $bid .']成功'));
        } catch(Exception $e){
            return json_encode(array('code' => -1, 'msg' => '删除图书['. $bid .']失败'));
        }
    }

    // 进入图书管理首页
    public function actionIndex(){
        $query = Book::find();

        // 分页查询所有的书籍 asArray() 将数据纯化
        $books = $query -> orderBy('bid') -> asArray()
            -> all();
        
        return json_encode($books);
    }
}