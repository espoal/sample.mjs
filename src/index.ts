
console.log("Hello world!")

const user_example = {
    name: "alberto",
    role: "engineer"
}

type User = typeof user_example


const log_user = (user: User) => {

    const {name, role} = user
    console.log({name})
    console.log({ role })

}

log_user(user_example)
