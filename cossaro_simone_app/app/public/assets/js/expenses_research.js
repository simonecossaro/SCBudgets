$(document).ready(function() {
    $(".search").keyup(function () {
        var searchTerm = $(".search").val();
        var listItem = $('.results tbody').children('tr');
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('");
      
        $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }});
      
        $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
            this.style.display = "none";
        });
  
        $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
            this.style.display = "table-row";
        });
  
        var jobCount = $('.results tbody tr[display="table-row"]').length;
        $('.counter').text(jobCount + ' item');
        if(jobCount == '0') {
            $('.no-result').show();
        } else {
            $('.no-result').hide();
        }
    });
});