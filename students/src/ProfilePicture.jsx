function ProfilePicture(props) {
    return(
        <div>
            <div>Profile Picture</div>
            <br></br>
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

//on mouse over not currently working :/

export default ProfilePicture