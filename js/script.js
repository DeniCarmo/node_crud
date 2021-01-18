document.addEventListener('DOMContentLoaded', function(){
    console.log('Scripts loaded');
    let btnDelete = document.querySelectorAll('.crud-delete__button');
    console.log(btnDelete);
    if(btnDelete.length > 0){
        for( let i = 0; i < btnDelete; i++){
            btnDelete[i].addEventListener('click', function(e){
                if(confirm('Do you really want to delete this user?')){
                    return true;
                }else{
                    e.preventDefault();
                }
            });
        }
    }
});