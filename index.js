import { Canvas, $, drawWaterMark } from './lib.js';
let c = new Canvas($('canvas'));
let tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
let date = `${tomorrow.getFullYear()}年${tomorrow.getMonth() + 1}月${tomorrow.getDate()}日`;
$('#watermark').setAttribute('placeholder', `此证件仅供${date}前办理XX业务使用，他用无效`);
$('#watermark').addEventListener('focus', function once() {
    this.value = `此证件仅供${date}前办理XX业务使用，他用无效`;
    $('#watermark').removeEventListener('focus', once);
});
$('#choose').addEventListener('click', () => $('#idcard').click());
$('#idcard').addEventListener('change', function () {
    $('#choose').setAttribute('disabled', '');
    let image = new Image();
    let reader = new FileReader();
    reader.addEventListener('load', function () {
        image.src = this.result;
    });
    reader.readAsDataURL(this.files[0]);
    image.addEventListener('load', function () {
        c.set(this.naturalHeight, this.naturalWidth);
        drawWaterMark(c, $('#watermark').value || ($('#watermark').value = $('#watermark').getAttribute('placeholder')), this);
        $('img').src = c.toDataURL(.4);
        $('#choose').removeAttribute('disabled');
    });
});
