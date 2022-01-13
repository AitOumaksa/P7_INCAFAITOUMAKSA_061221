

<template>
<!-- template de la fenetre modal-->
<transition name="modal">
   <div class="modal-mask mt-20">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
             <h5 class="modal-title">
               <!-- Utiliser des slot pour l'emplacement du contenu html-->
               <slot name="title">
                Modifier
                </slot>
             </h5>
            <slot name="header">
              
            </slot>
             <button type="button" class="btn-close" @click="$emit('close')" ></button>
           </div>
       

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

        
        </div>
      </div>
    </div>

 </transition>
</template>

<script>


export default {

}


</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
   width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-wrapper {

  vertical-align: middle;
}

.modal-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>