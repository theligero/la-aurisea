# La Aurisea --- Assets y dirección artística

Este documento recoge los recursos gráficos y tecnológicos identificados
en el repositorio, los criterios de dirección artística del proyecto y
las cuestiones de licencia que deben quedar documentadas.

> **Nota de alcance:** este inventario se ha elaborado a partir de los
> archivos presentes en la versión del repositorio revisada para el Hito
> 2. No se atribuye una licencia concreta a un recurso cuando su
> procedencia no puede verificarse con la información disponible.

## 1. Dirección artística

La dirección artística prevista para *La Aurisea* busca una estética 2D
inspirada en la mitología griega. Los escenarios deben evocar los
distintos episodios del viaje de Odiseo mediante arquitectura, ruinas,
vegetación, elementos marítimos y paletas diferenciadas.

Tras la revisión del diseño, se prioriza el uso de sprites 2D ya
preparados frente a la creación y animación manual de personajes
simples. La selección definitiva deberá favorecer:

-   Perspectiva cenital o compatible con una arena vista desde arriba.
-   Coherencia de escala, resolución, paleta y estilo entre protagonista
    y enemigos.
-   Animaciones legibles de reposo, desplazamiento, ataque, daño y
    muerte, cuando estén disponibles.
-   Fondos que aporten identidad al escenario sin dificultar la lectura
    de enemigos y proyectiles.
-   Recursos reutilizables para mantener un alcance de producción
    asumible.

Las referencias de búsqueda consideradas en el GDD son [itch.io Game
Assets](https://itch.io/game-assets),
[OpenGameArt](https://opengameart.org/),
[Kenney](https://kenney.nl/assets) y [CraftPix](https://craftpix.net/).
Estas páginas alojan recursos con licencias distintas: la licencia debe
comprobarse en la ficha de cada paquete o archivo antes de incorporarlo.

## 2. Recursos gráficos presentes en el repositorio

  -------------------------------------------------------------------------------
  Archivo                         Uso identificado        Procedencia / licencia
  ------------------------------- ----------------------- -----------------------
  `assets/sprites/player.png`     Sprite del personaje    La procedencia exacta
                                  controlable del         no queda identificada
                                  prototipo actual.       en los archivos del
                                                          repositorio revisado.
                                                          Verificar la fuente
                                                          original y su licencia.

  `assets/sprites/platform.png`   Sprite de plataforma    La procedencia exacta
                                  utilizado por la escena no queda identificada
                                  de prueba actual.       en los archivos del
                                                          repositorio revisado.
                                                          Verificar la fuente
                                                          original y su licencia.

  `assets/sprites/base.png`       Elemento gráfico        La procedencia exacta
                                  asociado a las          no queda identificada
                                  bases/plataformas de la en los archivos del
                                  escena de prueba.       repositorio revisado.
                                                          Verificar la fuente
                                                          original y su licencia.

  `assets/sprites/star.png`       Objeto coleccionable de La procedencia exacta
                                  la escena de prueba     no queda identificada
                                  actual.                 en los archivos del
                                                          repositorio revisado.
                                                          Verificar la fuente
                                                          original y su licencia.
  -------------------------------------------------------------------------------

**Importante:** estos recursos son los que aparecen en la
build/prototipo incluida en el ZIP revisado. No deben presentarse como
sprites definitivos de Odiseo, enemigos o escenarios de la versión final
del diseño.

## 3. Librerías y tecnología

  -----------------------------------------------------------------------
  Recurso                 Uso                     Licencia / atribución
  ----------------------- ----------------------- -----------------------
  `lib/phaser.min.js`     Framework utilizado     Phaser se distribuye
                          para crear y ejecutar   bajo licencia MIT.
                          el juego en el          Mantener el aviso de
                          navegador.              licencia
                                                  correspondiente a la
                                                  versión incluida.

  HTML, CSS y JavaScript  Estructura de la        Código del proyecto.
  del proyecto            página, estilos y       Revisar el archivo
                          lógica del prototipo.   `LICENSE` actual antes
                                                  de atribuir una
                                                  licencia global.
  -----------------------------------------------------------------------

## 4. Licencias y atribución

El repositorio incluye un archivo `LICENSE` con texto de licencia MIT y
una atribución a **Carlos León (2019)**. Esa atribución parece
corresponder a la plantilla o material de partida del proyecto y no debe
confundirse automáticamente con la autoría de todos los elementos
actuales de *La Aurisea*.

Antes de la publicación final conviene:

1.  Identificar la procedencia original de los cuatro sprites
    enumerados.
2.  Comprobar si la licencia de cada recurso permite su modificación y
    redistribución.
3.  Mantener los avisos de copyright y atribución exigidos por cada
    licencia.
4.  Diferenciar claramente el código propio, el código de la plantilla y
    las librerías de terceros.
5.  Actualizar el archivo `LICENSE` si se decide establecer una licencia
    para el código propio, conservando los avisos de terceros que
    correspondan.

Hasta que se verifique la procedencia de los sprites, su licencia debe
figurar como **pendiente de confirmar**, no como MIT ni como recurso
libre.

## 5. Recursos pendientes para la versión prevista en el GDD

  -----------------------------------------------------------------------
  Recurso necesario       Uso previsto            Estado
  ----------------------- ----------------------- -----------------------
  Sprite de Odiseo        Personaje principal con Pendiente de selección
                          perspectiva cenital.    / integración.

  Sprites de enemigos     Soldados, criaturas,    Pendiente de selección
                          pretendientes y jefes.  / integración.

  Animaciones             Movimiento, ataque,     Pendiente de selección
                          daño y muerte.          / integración.

  Fondos o tilesets       Troya, cueva de         Pendiente de selección
                          Polifemo, Sirenas, Eea, / integración.
                          Escila y Caribdis e     
                          Ítaca.                  

  Proyectiles y efectos   Flechas, impactos,      Pendiente de selección
                          ataques mágicos y zonas / integración.
                          de peligro.             

  Interfaz                Iconos de armas, vida,  Pendiente de selección
                          aura y temporizador.    / integración.

  Audio                   Música ambiental y      Pendiente de selección
                          efectos de              / integración.
                          combate/interfaz.       
  -----------------------------------------------------------------------

## 6. Registro de recursos externos

Al añadir nuevos recursos, completar una entrada con esta información:

  -----------------------------------------------------------------------
  Campo                               Información que debe registrarse
  ----------------------------------- -----------------------------------
  Nombre del recurso                  Nombre del pack, archivo o pista.

  Autor                               Nombre del creador o titular.

  URL                                 Enlace directo a la ficha o
                                      descarga.

  Licencia                            Licencia exacta indicada por el
                                      autor.

  Modificaciones                      Recortes, recoloreado, escalado,
                                      edición o adaptación realizada.

  Uso                                 Personaje, enemigo, escenario,
                                      interfaz, música, efecto, etc.

  Fecha de consulta                   Fecha en la que se comprobó la
                                      licencia.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

**Criterio general:** no se incorporará ningún recurso externo al
proyecto sin comprobar previamente su procedencia y condiciones de uso.
La coherencia artística y la claridad de las licencias tienen prioridad
sobre la cantidad de assets.
