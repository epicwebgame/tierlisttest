import * as React from "react";
import { Character } from "../../../shared/types";
import { useDrop } from "react-dnd";
import { DraggableCharacter, types } from "../index";
import { filterOne } from "../../../shared/helpers";
import css from "./style.scss";
import { Collapse } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoritesIcon from "@material-ui/icons/Favorite";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";

/**
 * Yes I know this class a duplicate of Tier, but I can't
 * be bothered to extract the logic to a parent component
 * also because I don't know how that works with react
 * @param initialCharacters
 * @param update
 */
export default ({ characters: initialCharacters = [], update }: any) => {
  const [isOpen, setOpen] = React.useState(true);
  const [characters, setCharacters] = React.useState<Character[]>(
    initialCharacters
  );

  React.useEffect(() => {
    update("Unranked", characters);
  }, [characters]);

  const [, drop] = useDrop({
    accept: types.CHARACTER,
    drop: (e, monitor) => {
      console.log(e);
      return setCharacters(prev => [...prev, monitor.getItem()]);
    }
  });

  const moveCharacter = (event?: Character) => {
    if (event) {
      setCharacters(prev =>
        filterOne(char => char.mal_id !== event.mal_id, prev)
      );
    }
  };

  return (
    <div ref={drop} className={css.tier}>
      <Collapse in={isOpen} className={css.collapse}>
        <div className={css.swipeSection}>
          <div className={css.tierCharacters}>
            {characters.map(char => (
              <DraggableCharacter
                key={char.mal_id}
                character={char}
                onEnd={moveCharacter}
              />
            ))}
          </div>
        </div>
      </Collapse>
      <BottomNavigation showLabels className={css.bottomDrawer} color="red">
        <BottomNavigationAction
          label={isOpen ? "Hide Characters" : `Show Characters`}
          icon={isOpen ? <ArrowDown /> : <ArrowUp />}
          onClick={() => setOpen(!isOpen)}
        />
      </BottomNavigation>
    </div>
  );
};