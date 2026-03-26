import "./card.css";

interface CardProps {
  title: string;
  description: string;
  buttonLabel: string;
  imageSrc: string;
  onClick?: () => void;
}

export const Card = ({
  title,
  description,
  buttonLabel,
  imageSrc,
  onClick,
}: CardProps) => {
  return (
    <div className="card">
      <div className="card__overlay" />
      <img src={imageSrc} alt={title} className="card__image" />
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
      <div className="card__footer">
        <button
          className="card__button storybook-button storybook-button--primary storybook-button--medium"
          onClick={onClick}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};
