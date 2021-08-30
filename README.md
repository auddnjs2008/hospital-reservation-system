# 클라우드 MSA 구조를 활용한 병원예약 웹 서비스 개발 프로젝트

MSA란 마이크로 서비스 아키텍처(Micro Service Architecture)의 약자로 단일 프로그램을 각 컴포넌트 별로 나누어 작은 서비스의 조합으로 구축하는 방법입니다. 각 컴포넌트는 서비스 형태로 구현되고 API를 이용하여 타 서비스와 통신하게 됩니다.

<h1> 설계도 </h1>
<img src="https://user-images.githubusercontent.com/46766443/131269863-341f010e-b618-4631-bb44-dbb55462b9bf.png"/>

<h1> 기능 </h1>

<h2>추천 알고리즘</h2>
<img src="https://user-images.githubusercontent.com/46766443/131270746-839a4c96-cbda-459b-a95c-1ac720ccb785.png"/>
<p>
    원하는 병원 진료과를 선택하면 카카오톡 sdk에서 자기 위치에 가까운 장소를 최대 15곳 선택해 제공을 해준다. 그 병원 데이터를 aws api-gateway에 api post 요청을 하면  람다함수로 작성해둔 추천 알고리즘
    에 의해 병원 목록의 순서를 재배열해서 다시 보내준다. 
    추천알고리즘은 별점과 거리 그리고 댓글개수를 종합하여 판단한다.
</p>

<h2>병원 예약 기능</h2>
<img src="https://user-images.githubusercontent.com/46766443/131270829-c4f39f20-7cae-4039-8cb6-cb38dc1572ab.png"/>
<img src="https://user-images.githubusercontent.com/46766443/131270871-3937ce55-400e-4c72-9db2-f5fad8645bd7.png"/>
<p>
    서비스에 등록된 병원이면 이 기능이 사용 가능하다. 
    병원리스트에서 예약을 선택하면 의사 목록이 뜬다. 의사를 선택하면 의사별로 달력에서
    가능한 시간대를 예약 할 수 있다. 
</p>

<h2> 채팅 기능 </h2>
<img src="https://user-images.githubusercontent.com/46766443/131270998-d83344a1-5b74-45ed-af22-4d6573637961.png"/>
<img src="https://user-images.githubusercontent.com/46766443/131271016-029d4db2-27e3-473e-8a7d-5f3c429bf73e.png"/>
<img src="https://user-images.githubusercontent.com/46766443/131271145-07f29df6-1447-44d1-8002-ba92f9c8ff9c.png"/>
<p>
    이 서비스는 병원 관리자로 로그인할 수 있고 유저로 로그인 할 수 있다. 
    그리고 유저가 해당 병원에 질문이 있으면  실시간 웹 소켓 통신 채팅으로 
    바로 병원 관리자한테 메시지를 보낼 수 있는 기능이 있다.
</p>

<h2> My page 기능 </h2>
<img src="https://user-images.githubusercontent.com/46766443/131270925-f7a33e4a-f9f6-44d9-9797-b146a6b66a9b.png"/>
<p>
    내가 예약했던 병원 목록들을 볼 수 있고 최근 클릭한 병원페이지들의 목록을 볼 수 있다.   
</p>

<h2> 리뷰 작성 기능</h2>
<img src="https://user-images.githubusercontent.com/46766443/131270955-462c6291-ce6c-4d5b-b52c-49a2c47f2fc2.png"/>
<p>
    사람들이 쓴 리뷰를 볼 수 있고 별점과 리뷰를 작성할 수 있다. 
</p>
