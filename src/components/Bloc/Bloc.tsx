interface BlocProps {
    width?: string;
    height?: string;
}

const Bloc = ({width = "1px", height = "1px"}: BlocProps) =>
    <div
        style={{
            width: width,
            height: height,
        }}
    />;

export default Bloc;
