/**
 * This is the base interface for the Dragon model.
 * This model is the base for the complete API dragon model.
 * This should be used to create PUT/POST calls, containing only useful fields for the user, without ids or createdAt fields
 */
export interface DragaoBase {
  /**
   * This is the dragon's name
   */
  name: string;
  /**
   * This is the dragon's type
   */
  type: string;
}

/**
 * This is the interface for the Dragon model.
 * This model is the only one used in the application as far as I know.
 */
export interface Dragao extends DragaoBase {
  /**
   * This is the object's id.
   * This probably should be a number because the API always creates a number to fill the ID but returns the number as a string.
   */
  id: string;
  /**
   * This is a date string containing the object's creation date
   */
  createdAt: string;
  /**
   * There's no information about this array, every existent dragon has a empty array here
   * Probably shouldn't be used, do what you want at your own risk
   */
  histories?: [];
  /**
   * This seems like a random variable, some dragons have this, some don't, sometimes it's an array, sometimes it's an object, very random, no info about it.
   * The backend is probably using NoSQL like MongoDB that allows you to save anything in the variable, without restrictions.
   */
  dragon?: Dragao | Dragao[];
}
