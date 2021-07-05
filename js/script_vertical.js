$(function(){
    var $box = $('section'),
        $nav = $('.indicator>a'),
        current = 0,
        $last = $box.length-1;
    
        $box.eq(current).animate({top:"0"},5); //시작하면 0번째 섹션 보이게

    //휠이벤트
    $(window).on('mousewheel',function(e){
        var delta = e.originalEvent.wheelDelta; // -120, 120
        if(delta<0){
            if($box.is(':animated') == false){
                if(current == $last){
                    return; //current가 3이면 종료
                }else{
                    current ++; //1
                    old = current-1; //0
                    $box.eq(current).css({top:"100%"}).stop().animate({top:"0%"},500);
                    $box.eq(old).stop().animate({top:"-100%"},500);
                    $nav.eq(current).addClass('active');
                    $nav.eq(old).removeClass('active');
    
                    console.log(`current : ${current}, old: ${old}`);
                };
            };
            
        }else{
            if($box.is(':animated') == false){

                if(current == 0){
                    return; //current가 0이면 함수종료
                }else{
                    current --;
                    old = current+1;
                    $box.eq(current).css({top:"-100%"}).stop().animate({top:"0%"},500);
                    $box.eq(old).stop().animate({top:"100%"},500);
                    $nav.eq(current).addClass('active');
                    $nav.eq(old).removeClass('active');
                    console.log(`current : ${current}, old: ${old}`);
                };

            };
        };
    });


    //인디케이터 클릭
    $nav.on('click',function(){
        var it = $(this).index();
        console.log(`click : ${it} current : ${current}`);

        $nav.removeClass('active');
        $nav.eq(it).addClass('active');
        
        if($box.is(':animated') == false){
            if(it > current){ //it이  current보다 클 경우, 스크롤 다운이랑 동일
                $box.eq(current).stop().animate({top:"-100%"},500);
                $box.eq(it).css({top:"100%"}).stop().animate({top:"0%"},500);
                current = it;
            }else if(it < current){//it이  current보다 작을 경우, 스크롤 업이랑 동일
                $box.eq(current).stop().animate({top:"100%"},500);
                $box.eq(it).css({top:"-100%"}).stop().animate({top:"0%"},500);
                current = it;
            }else if(it == current){//it이  current랑 같을 경우
                console.log('stop');
                $box.eq(current).stop();
                $box.eq(it).stop();
            };
        };

        return false;
    });

});