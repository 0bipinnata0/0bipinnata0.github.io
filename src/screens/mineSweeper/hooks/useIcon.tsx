const useIcon = (type: number) => {
  switch (type) {
    case -1:
      return <>🚩</>;
    case 1:
      return <div>1</div>;
    case 2:
      return <div>2</div>;
    case 3:
      return <div>3</div>;
    case 4:
      return <div>4</div>;
    case 5:
      return <div>5</div>;
    case 6:
      return <div>6</div>;
    case 7:
      return <div>7</div>;
    case 8:
      return <div>8</div>;
    default:
      return null;
  }
};

export default useIcon;
