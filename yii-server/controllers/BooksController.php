<?php

namespace app\controllers;

use Yii;
use app\models\Books;
use app\models\BooksSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\Response;

/**
 * 图书Books的增删改查API
 */
class BooksController extends Controller
{
    //csrf间接的提交数据 本身node 让其可以作为接口操作数据
    public $enableCsrfValidation = false;
    
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    // 指定delete的请求方式
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * 获取图书列表
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new BooksSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
        //返回json格式的数据
        YII::$app->response->format = Response::FORMAT_JSON;
        return  $dataProvider -> getModels();
    }

    /**
     * 查看书的详细
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($bid)
    {
        //返回json格式的数据
        YII::$app->response->format = Response::FORMAT_JSON;

        return $this -> findModel($bid);
    }

    /**
     * 新增书籍
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        YII::$app->response->format = Response::FORMAT_JSON;

        $result = array("code"=>-1,"message"=>"新增图书失败");
        $model = new Books();

        if ($model->load(Yii::$app->request->post(), '') && $model->save()) {
            $result["code"] = 1;
            $result["message"] = "新增图书成功";
        }
        
        return $result;
    }

    /**
     * 更新图书信息
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $bid 图书编码
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($bid)
    {   
        YII::$app->response->format = Response::FORMAT_JSON;
        
        $model = $this->findModel($bid);

        $result = array("code"=>-1,"message"=>"更新图书[" . $bid . "]信息失败");
        // 第二个参数不加，永远返回false
        if ($model->load(Yii::$app->request->post(), '') && $model->save()) {
            $result["code"] = 1;
            $result["message"] = "更新图书[" . $bid . "]信息成功";
        }

        return $result;
    }

    /**
     * 删除指定的书籍
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $bid 编码
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($bid)
    {   
        YII::$app->response->format = Response::FORMAT_JSON;

        $result = array("code"=>-1,"message"=>"删除图书[" . $bid . "]失败");
        $row = $this->findModel($bid)-> delete();
        if($row === 1){
            $result["code"] = 1;
            $result["message"] = "删除图书[" . $bid . "]成功";
        }

        return $result;
    }

    /**查找指定图书
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $bid 编码
     * @return Books the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($bid)
    {
        if (($model = Books::findOne($bid)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('请求错误');
    }
}
