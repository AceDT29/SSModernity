<script>
    import { Link, navigate } from "svelte-routing"
    let emailValue
    let passValue

    function userInfoHandler() {
        if( passValue.length < 5) {
            console.log("numero de caracteres invalido")
            return
        } else {
            navigate("/Profile", {replace: true, preserveScroll: true})
        }
    }
</script>

<div class="W-full h-auto p-4 flex">
    <figure class="w-80 h-[400px] bg-slate-400">
        <img src="" alt="" />
    </figure>
    <form class="LoginForm" on:submit|preventDefault={userInfoHandler}>
        <h2 class="text-2xl">Inicia sesion</h2>
        <label for="emailID">
            Email
            <input bind:value={emailValue} class="LoginInput" type="email" placeholder="Example@gmail.com" id="emailID" required/>
        </label>
        <label for="passID">
            Password
            <input bind:value={passValue} class="LoginInput" type="password" placeholder="******" id="passID" required/>
        </label>
        <input class="w-24 h-10 p-2 rounded-lg bg-gradient-to-r from-sky-700 to-blue-600" type="submit">
        <div>
            <h2>No estas registrado? registrate aqui ahora:</h2>
            <Link to="/SignUp" preserveScroll>
                <button
                    class="text-sm p-2 w-28 h-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-500"
                    >Registrer Now
                </button>
            </Link>
        </div>
    </form>
</div>
