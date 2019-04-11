<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\EntryForm;

class SiteController extends Controller{
    /**
     * {@inheritdoc}
     */
    public function behaviors(){
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions(){
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex(){
        $this->redirect(array('book/index'));
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin(){
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact(){
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout(){
        return $this->render('about');
    }

    // 创建动作
    /**
     * 请求URL:
     * http://localhost:8081/basic/web/index.php?r=site/say
     * 
     * 控制器命名规则: 控制器 + Controller  多个单词组成的控制器改成驼峰式 + Controller
     * 操作命名规则： action + 操作名
     * 参数解析：
     *      r: 表示路由，控制请求交给哪个控制器的哪个操作取出来
     *      site 表示使用了siteController控制器
     *      say 表示使用siteController控制器下的actionSay方法
     * 一个请求的完整流程：
     *      浏览器发送一个请求，框架根据参数r的值做对应的转发，比如r= site/say, 当用户发送一个请问时，
     *      将会使用siteController控制器的actionSay方法去处理请求，访问model层，将查询的数据，交给
     *      $this -> render("视图名"，"数据")方法去渲染试图
     */
    public function actionSay($message  = 'Hello'){

        // 渲染视图
        return $this -> render('say', ['message' => $message]);
    }

    public function actionEntry(){
        $model = new EntryForm();

        //Yii::$app 代表应用实例,能提供 request，response，db等特定功能的组件
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            return $this->render('entry-success', ['model' => $model]);
        } else {
            // 无论是初始化显示还是数据验证错误
            return $this->render('entry', ['model' => $model]);
        }
    }
}
