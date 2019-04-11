<?php
    // 导入Html类
    use yii\helpers\Html;
?>
<!-- 调用Html中的encode方法编码用户输入的message -->
<?= Html::encode($message) ?>