import InteractiveG from "./InteractiveG/InteractiveG";
import SkillFlip from "./SkillFlip/SkillFlip";
import "./Name.scss";

export default function AnimatedName() {
  return (
    <div className="animated-name" aria-label="Grayson Gales">
      {/* Line 1 */}
      <div className="name-line line-1">
        <InteractiveG
          strength={5}
          className="initial"
          activeRadius={120}
          maxRotate={2}
        />
        <span className="rest rest-1">RAYSON</span>
      </div>

      {/* Line 2 */}
      <div className="name-line line-2">
        <span className="initial-drop-wrapper" aria-hidden="true">
          <InteractiveG
            strength={5}
            activeRadius={120}
            maxRotate={2}
            className="initial"
          />
        </span>
        <span className="rest rest-2">ALES</span>

        <SkillFlip
          items={[
            "creative problem solver",
            "people leader",
            "frontend developer",
            "accessibility-first",
            "design-centered",
          ]}
        />
      </div>

      {/* Screen-reader friendly full text */}
      <span className="sr-only">Grayson Gales</span>
    </div>
  );
}
