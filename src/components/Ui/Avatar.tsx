function Avatar({ src = "/images/avatar.png", width = 24, height = 24 }) {
  return (
    <img
      src={src || "/images/avatar.png"}
      width={width}
      height={height}
      className="rounded-full ring-1 ring-secondary-300 ml-2"
      alt={src}
    />
  );
}
export default Avatar;
