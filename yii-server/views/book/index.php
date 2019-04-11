<?php
    use yii\helpers\Html;
    use yii\widgets\LinkPager;
?>
<a href="<?=Html::encode(Yii::$app->homeUrl)?>?r=book/update"><button type="button" class="btn btn-success btn-md">新增图书</button></a>
<table class="table table-striped">
    <thead>
        <tr>
            <th>编码</th>
            <th>书名</th>
            <th>作者</th>
            <th>价钱</th>
            <th>分类</th>
            <th>描述</th>
            <th>操作</th>
        </tr>
    </thead>
    <?php foreach ($books as $book): ?>
        <tr>
            <td>
                <?= Html::encode("{$book -> bid}")?>
            </td>
            <td>
                <?= Html::encode("{$book -> bname}")?>
            </td>
            <td>
                <?= Html::encode("{$book -> bauth}")?>
            </td>
            <td>
                <?= Html::encode("{$book -> bprice}")?>
            </td>
            <td>
                <?= Html::encode("{$book -> btype}")?>
            </td>
            <td>
                <?= Html::encode("{$book -> bdesc}")?>
            </td>
            <td>
                <a href="<?=Html::encode(Yii::$app->homeUrl)?>?r=book/update&bid=<?=Html::encode("{$book -> bid}")?>"><button type="button" class="btn btn-warning btn-xs">修改</button></a>
                <a href="<?=Html::encode(Yii::$app->homeUrl)?>?r=book/delete&bid=<?=Html::encode("{$book -> bid}")?>"><button type="button" class="btn btn-danger btn-xs">删除</button></a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>

<?= LinkPager::widget(['pagination' => $pagination]) ?>