$(function(){
    var $box = $('section'),
        $nav = $('.indicator>a'),
        current = 0,
        old = 0,
        $last = $box.length-1;
    
        $box.eq(current).animate({left:"0"},5); //시작하면 0번째 섹션 보이게


    $(window).on({
        mousewheel:function(e){
            var delta = e.originalEvent.wheelDelta;
            if($box.is(':animated') == false){
                if(delta<0){ //스크롤 다운
                    if(current == $last){
                        return;
                    }else{
                        current++;
                        old = current-1;
                        down();
                    };
                }else{ //스크롤 업
                    if(current == 0){
                        return;
                    }else{
                        current --;
                        old = current+1;
                        up();
                    }
                };
            };
        },
        click : function(){
            $nav.on('click',function(){
                var $this = $(this).index(),
                    $prev = current.valueOf(); //이전 current의 값
                if($box.is(':animated') == false){
                    if($this > current){
                        current = $this;
                        old = $prev;
                        down();
                    }else if($this < current){
                        current = $this;
                        old = $prev;
                        up();
                    }else if($this == current){
                        return;
                    };
                };

                console.log(`이전값은 ${$prev} this는 ${$this}`);
            });
            return false;
        }
    });

    
    function down(){
        $box.eq(current).css({left:"100%"}).stop().animate({left:"0%"},500); 
        $box.eq(old).stop().animate({left:"-100%"},500); 
        $nav.removeClass('active');
        $nav.eq(current).addClass('active');
        
        console.log(`current : ${current}, old: ${old}`);
    };
    

    function up(){
        $box.eq(current).css({left:"-100%"}).stop().animate({left:"0%"},500); 
        $box.eq(old).stop().animate({left:"100%"},500);
        $nav.removeClass('active');
        $nav.eq(current).addClass('active');

        console.log(`current : ${current}, old: ${old}`);
    };


});
