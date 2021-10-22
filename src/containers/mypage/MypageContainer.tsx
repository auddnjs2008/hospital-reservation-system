import MypageComponent from "../../components/mypage/MypageComponent";

interface IMypageContainer {
  manager: boolean;
  id: string;
}

const MypageContainer: React.FC<IMypageContainer> = ({ manager, id }) => {
  return <MypageComponent manager={manager} id={id} />;
};

export default MypageContainer;
