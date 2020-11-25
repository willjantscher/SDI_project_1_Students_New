function ProfilePicture(props) {
    // console.log(props.currentPicture)
    // onMouseOver not working yet :/
    return(
        <div>
            <div>Profile Picture</div>
            <select defaultValue={props.currentPicture} onChange={props.onSelectProfilePicture}>
                <option value='0' onMouseOver={props.onHoverProfilePicture}>Dog Picture 0</option>  
                <option value='1' onMouseOver={props.onHoverProfilePicture}>Dog Picture 1</option>
                <option value='2' onMouseOver={props.onHoverProfilePicture}>Dog Picture 2</option>
                <option value='3'>Dog Picture 3</option>
                <option value='4'>Dog Picture 4</option>
            </select>
        </div>
    )
}

export default ProfilePicture