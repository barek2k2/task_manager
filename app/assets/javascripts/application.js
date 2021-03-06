//= require jquery
//= require bootstrap
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require cable
//= require_tree .

Array.prototype.hasObjectExists = function(item) {
    for (i = 0; i < this.length; i++) {
        if(this[i].id == item.id){
            return true;
        }
    }
    return false;
};

function resizeAllTextAreaHeight(){
    $("textarea").each(function(){
        if($(this).is(":visible")){
            $(this).height($(this).get(0).scrollHeight-4);
        }
    })
}