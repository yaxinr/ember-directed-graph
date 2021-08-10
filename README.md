ember-directed-graph
==============================================================================

Using [dagre](https://github.com/dagrejs) for draw directed graph with link to route at nodes (@route/node.id)


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-directed-graph
```


Usage
------------------------------------------------------------------------------

```js
import Route from '@ember/routing/route';
export default class StagesMapRoute extends Route {
    model() {
        return {
            nodes: [{ id: '1', label: `first` },{ id: '2', label: `second` }],
            steps: [{start:'1', finish:'2'}]
        }
    }
}
```
```hbs
<DirectedGraph
  @nodes={{this.model.nodes}}
  @steps={{this.model.steps}}
  @route="stage"
/>
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
