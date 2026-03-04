S(",card").on("click",function() {
    S(".detail".addClass)("active");
});
S(".close.detail").on("click",function(){
    S(".detail").removeClass("active")

});
S(".menu.bar").on("click",function(){
    S(".sidebar").addClass("active")
});
S(",logo").on("click",function() {
    S(".sidebar").removeClass("active")
});
