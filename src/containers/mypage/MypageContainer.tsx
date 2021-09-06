import MypageComponent from "../../components/mypage/MypageComponent";

interface IMypageContainer {
  manager: boolean;
}

const MypageContainer: React.FC<IMypageContainer> = ({ manager }) => {
  return <MypageComponent manager={manager} />;
};

export default MypageContainer;
