<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>

<!-- 生成html表单  ActiveForm 小部件-->
<?php $form = ActiveForm::begin(); ?>
    
    <!-- field 创建输入框 -->
    <?= $form->field($model, 'name') ?>

    <?= $form->field($model, 'email') ?>

    <div class="form-group">
        <!-- 生成一个提交按钮 -->
        <?= Html::submitButton('Submit', ['class' => 'btn btn-primary']) ?>
    </div>

<?php ActiveForm::end(); ?>