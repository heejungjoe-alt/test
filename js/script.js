// 헤더고정
// 코드 실행
$(function () {
    // 윈도우 스크롤 시 실행
    $(window).scroll(function () {
        // 스크롤이 300px 넘으면,
        if ($(this).scrollTop() > 300) {
            // .header_scrolled 클래스 추가
            $(".bg1").addClass("header_scrolled");
            // .logo_img 클래스를 가진 img 태그의 이미지 경로를 변경
            // attr : 해당 속성을 읽거나/ 바꾸는 역할
            // 보통 html 요소의 속성을 가져오거나 변경하는 함수
            $(".logo img").attr("src", "./images/header/logo_sub.svg");
        } else {
            // 스크롤이 위로 올라가면 클래스 제거
            $(".bg1").removeClass("header_scrolled");
            // .logo_img 클래스를 가진 img 태그의 이미지 경로를 다시 원상태로 복구
            $(".logo img").attr("src", "./images/header/logo.svg");
        }
    });

    // 마우스를 올렸을 때(hover 시)
    $(".bg1").hover(function () {
        // header_scrolled 클래스 제거
        //$(this).removeClass("header_scrolled");
        //$(this).addClass("bg_sub");
    },
        function () {
            // 마우스가 나갔을 때, 스크롤이 100 이상이면 다시 header_scrolled 클래스 추가
            if ($(window).scrollTop() > 100) {
                $(this).addClass("header_scrolled");
                //$(this).removeClass("bg_sub");
            }
        }
    );
});

// 헤더 active 처리

// 1. 필요한 요소 가져오기
// const : 값이 변하지 않는 변수를 선언할 때 쓰는 키워드
const sections = document.querySelectorAll('.section'); // 모든 section (스크롤 기준이 되는 영역)
const gnbLinks = document.querySelectorAll('.gnb li a'); // 상단 메뉴 a 태그들

// 2. IntersectionObserver 생성
// IntersectionObserver : 요소가 화면(Viewport)에 들어왔는지 감지하는 API
const observer = new IntersectionObserver((entries) => {

    // entries = 현재 감지된 section들의 상태 배열
    entries.forEach(entry => {

        // entry.isIntersecting
        // if 조건문 : 조건이 맞으면 실행하는 문법
        //  해당 section이 화면에 "보이면 true"
        if (entry.isIntersecting) {

            // 현재 보이는 section id
            const id = entry.target.getAttribute('id');

            // 3. 기존 active 전부 제거
            gnbLinks.forEach(link => link.classList.remove('active'));

            // 4. 현재 section과 연결된 메뉴 찾기
            // a[href="#section1"] 이런 식으로 찾음
            const activeLink = document.querySelector(`.gnb li a[href="#${id}"]`);

            // 해당 메뉴가 존재하면 active 추가
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    // 5. 옵션 설정
    // threshold : 몇 % 보일 때 실행할지
    threshold: 0.5 // 화면에 50% 보이면 활성화
});

// 6. 각 section 감시 시작
// 모든 section을 observer에 등록
sections.forEach(section => observer.observe(section));

// top_버튼 
// 코드실행
$(function () {

    // topBtn을 클릭하면, html이랑 body한테 애니메이션을 준다.
    // 맨 위로 부드럽게 이동
    $(".topBtn").click(function () {
        $("html, body").animate({
            scrollTop: '0'
        }, 1000);
    });

    // 일정 구간부터 버튼 나타나게 하기
    $(".topBtn").hide();

    $(window).scroll(function () {
        // if else 조건문 : 스크롤 위치가 100보다 크면 보이고, 100보다 작으면 사라진다.
        if ($(this).scrollTop() > 100) {
            $(".topBtn").fadeIn()
        } else {
            $(".topBtn").fadeOut()
        }
    });

    // kakao 버튼에 링크 걸기(현재 창에서 이동)
    // $(".kakaoBtn").click(function() {
    //    window.location.href = "https://www.kakaocorp.com/page/service/service/KakaoTalk";
    //});

    // kakao 버튼에 링크 걸기(새 창 이동)
    $(".contactBtn").click(function () {
        window.open("https://www.kakaocorp.com/page/service/service/KakaoTalk", "_blank");
    });
});

// 팝업 만들기

$(function () {
    $(".popup").hide();

    $(".btn_over").click(function () {
        // 클릭한 요소에서 데이터 가져오기
        let title = $(this).data("title");
        let desc = $(this).data("desc");
        let img = $(this).data("img");

        // 팝업에 넣기
        $(".pop_title").html(title);
        $(".pop_desc").html(desc);
        $(".pop_img").attr("src", img);

        $(".popup").fadeIn(700);
        $("#popup_wrap").fadeIn(0); // 배경도 같이 켜는게 좋음
    });

    $("#popup_close").click(function () {
        $(".popup").fadeOut(500);
        $("#popup_wrap").fadeOut(500);
    });
});

//--모바일메뉴----------------------

// 문서 전체에서 마우스 버튼을 놓쳤을 때 이벤트 실행
// mouseup : 마우스 버튼을 눌렀다가 뗄 때 발생하는 이벤트
// function(e) : 이벤트 발생 시 실행되는 함수/ e는 이벤트 객체(event object)
$(document).mouseup(function (e) {

    // 모바일 메뉴(#m_gnb_wrap)와 햄버거 버튼(.hamburger)을 컨테이너로 정의
    var container = $("#m_gnb_wrap, .hamburger")

    // 클릭한 요소가 컨테이너 자체가 아니고, 컨테이너 내부에도 포함되지 않았다면,

    // "클릭한 위치가 특정 영역 바깥인지 체크하는 조건문"
    // !container.is(e.target) : container 자체를 클릭한 게 아닐 때
    // container.has(e.target) : container 안에 e.target이 포함되어 있는지 확인/ 자식 요소까지 포함해서 검사
    // && : 조건1도 맞고, 조건2도 맞으면 실행(조건 연산자)
    // .length === 0 : 포함된 요소가 없다 -> 자식도 아님
    // is() : 자기 자신 체크
    // has() : 내부 요소 체크
    if (!container.is(e.target) && container.has(e.target).length === 0) {

        // 메뉴 닫기 : 체크박스 해제
        // .prop : 현재 상태값을 가져오거나 바꿀 때 사용
        // $(선택자).prop("속성명"); -> 값 가져오기
        //  $(선택자).prop("속성명", 값); -> 값 설정하기
        $("#hamburger").prop("checked", false);
    }
});

// 화면 크기 변경 시 모바일 메뉴 닫기
$(window).on("resize", function () {

    $("#m_gnb_wrap").addClass("resize-off");

    if ($(window).width() > 1024) {
        $("#hamburger").prop("checked", false);
    }

    clearTimeout(window.resizeTimer);

    window.resizeTimer = setTimeout(function () {
        $("#m_gnb_wrap").removeClass("resize-off");
    }, 300);
});