import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUserNinja,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { getDominantStat } from "../../game/character";

const ICON_BY_STAT = {
  constitution: faUserSecret,
  dexterite: faUserNinja,
  intelligence: faUserGraduate,
};

// The icon represents the strongest characteristic of the profile.
function CharacterIcon({ character }) {
  return <FontAwesomeIcon icon={ICON_BY_STAT[getDominantStat(character)]} />;
}

export default CharacterIcon;
