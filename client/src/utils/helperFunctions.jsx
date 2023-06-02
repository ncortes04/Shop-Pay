import goldStar from'../assets/ic-actions-star.svg'
import blankStar from'../assets/ic-actions-star-blank.svg'
export const importImage = function (name) {
  name = name.toLowerCase().replace(/\s+/g, '-');
    try {
      return require(`../assets/${name}.svg`);
    } catch (error) {
      console.error(`Failed to load image: ${name}`);
      return null;
    }
  };
  export const getStar = function(limit){
    let res = []
    for(let i = 0; i < 5; i ++){
        if(i < limit) {
            res.push(
                <img src={goldStar}></img>

            )
        } else {
            res.push(<img src={blankStar}></img>)
        }
    }
    return res
  }

  export const  currentTime = function(date){
    const options = { year: "numeric", month: "long", day: "numeric", hour:"numeric", minute: 'numeric'}
    return new Date(date).toLocaleDateString(undefined, options)
}