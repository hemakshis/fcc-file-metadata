$("#my-file").click(function () {
  $("input[type='file']").trigger('click');
});

$('input[type="file"]').on('change', function() {
  var val = $(this).val();
  if (val) {
    $("#submit").removeAttr('disabled');
  }
  val = val.replace('C:\\fakepath\\', '&nbsp;');
  val = val + '&nbsp;'
  $(this).siblings('span').html(val);
});
