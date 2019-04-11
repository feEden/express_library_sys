<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>

<!-- 生成html表单  ActiveForm 小部件-->
<?php $form = ActiveForm::begin(); ?>
    <?= $form->field($book, 'bid') -> label('图书编码') -> input('text', ['value'=> Html::encode($book -> bid), 'readonly' => true]) ?> 
    <?= $form->field($book, 'bname') -> label('图书名') -> input('text', ['value'=> Html::encode($book -> bname)])?>
    <?= $form->field($book, 'bprice') -> label('图书价格') -> input('text', ['value'=> Html::encode($book -> bprice)])?>
    <?= $form->field($book, 'bauth')  -> label('图书作者') -> input('text', ['value'=> Html::encode($book -> bauth)])?>
    <?= $form->field($book, 'btype')  -> label('图书分类') -> input('text', ['value'=> Html::encode($book -> btype)])?>
    <?= $form->field($book, 'bdesc')  -> label('描述') -> input('text', ['value'=> Html::encode($book -> bdesc)])?>

    <div class="form-group">
        <?= Html::submitButton(Html::encode($book -> bname) ? '更新' : '新增', ['class' => 'btn btn-success']) ?>
    </div>

<?php ActiveForm::end(); ?>