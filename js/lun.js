$(function(){
    let im=$('.pic img').size();
    let deg=360/im;
    $('.pic img').each(function(i){
        $(this).css({
            'transform':'rotateY('+deg*i+'deg) translateZ(350px)',
        })
        $(this).attr('ondragstart','return false');
    })
    let nx,ny,nxs=0,nys=0,time=null;
    $('body').mousedown(function(ev){
        let x_=ev.clientX;
        let y_=ev.clientY;
        clearInterval(time);
        $(this).bind('mousemove',function(ev){
            ev=ev||window.event;
            let x=ev.clientX;
            let y=ev.clientY;
            nx=x-x_;
            ny=y-y_;
            nxs+=nx*0.1;
            nys-=ny*0.05;

            // $(this).append('<div style="width: 10px;height: 5px;background:red;' +
            //     'position: absolute;left:'+x+'px;top: '+y+'px;"></div>');
            $('.pic').css({
                transform:'perspective(1000px) rotateX(-12deg) rotateY('+nxs+'deg) rotateX('+nys+'deg)',
            })
            x_=ev.clientX;
            y_=ev.clientY;
        })
    }).mouseup(function(){
        $(this).unbind('mousemove');
        time=setInterval(function(){
            nx=nx*0.95;
            ny=ny*0.95;
            console.log(nx);
            if(Math.abs(nx)<0.1&&Math.abs(ny)<0.1){
                clearInterval(time);
            }
            nxs+=nx*0.1;
            nys-=ny*0.05;
            $('.pic').css({
                transform:'perspective(1000px) rotateX(-12deg) rotateY('+nxs+'deg) rotateX('+nys+'deg)',
            })
        },30);
    })
})