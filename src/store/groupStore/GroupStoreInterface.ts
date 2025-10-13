import { Dispatch, SetStateAction } from "react";
import { Group } from "../../models/groups/Group";

export interface GroupStoreInterface {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectedGroupId: number | null;
  setSelectedGroupId: Dispatch<SetStateAction<number | null>>;
  selectedGroup: Group;
  setSelectedGroup: Dispatch<SetStateAction<Group>>;
  isDetailsLoading: boolean;
  setIsDetailsLoading: Dispatch<SetStateAction<boolean>>;
}
