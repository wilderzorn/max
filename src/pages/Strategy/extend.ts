import buding from '@/assets/buding.png';
import type { GraphData, TreeGraph, TreeGraphData } from '@antv/g6';
import G6 from '@antv/g6';

interface IProps {
  data: GraphData | TreeGraphData;
  onReady?: (graph: TreeGraph) => void;
}

class ExtendGraph {
  public graphRef: HTMLElement | null = null;
  public graph: TreeGraph | null = null;

  public onInitGraph(ref: HTMLElement, data: IProps['data']): void {
    this.graphRef = ref;
    this.graph = new G6.TreeGraph({
      container: ref,
      width: ref.offsetWidth ?? 1200,
      height: ref.offsetHeight ?? 800,
      fitCenter: true,
      animate: true,
      defaultNode: {
        type: 'flow-rect',
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#CED4D9',
        },
      },
      modes: {
        default: [
          'zoom-canvas',
          'drag-canvas',
          'drag-node',
          'brush-select',
          'click-select',
        ],
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => 60,
      },
    });

    window.addEventListener('resize', this.debounce(this.onResize, 100));
    this.onGraphData(data);
    this.onHandlerEvent();
  }

  public onHandlerEvent = (): void => {
    if (!this.graph) return;
    this.graph.on('collapse-text:click', this.handleCollapseClick);
    this.graph.on('collapse-back:click', this.handleCollapseClick);
    this.graph.on('nodeselectchange', this.handleNodeSelectChange);
    this.graph.on('node:dragstart', this.handleNodeDragStart);
    this.graph.on('node:drag', this.handleNodeDrag);
    this.graph.on('node:dragend', this.handleNodeDragEnd);
    this.graph.on('drop', this.handleDrop);
    this.graph.on('node:dblclick', this.handleNodeDblClick);
    this.graph.on('mouseup', this.handleMouseUp);
  };

  private handleCollapseClick = (e: any): void => {
    const target = e.target;
    const id = target.get('modelId');
    const item = this.graph?.findById(id);
    if (item) {
      const nodeModel: IProps['data'] = item.getModel();
      nodeModel.collapsed = !nodeModel.collapsed;
      this.graph?.layout();
      this.graph?.setItemState(item, 'collapse', nodeModel.collapsed);
    }
  };

  private handleNodeSelectChange = (e: any): void => {
    // Handle node select change
  };

  private handleNodeDragStart = (e: any): void => {
    // Handle node drag start
  };

  private handleNodeDrag = (e: any): void => {
    // Handle node drag
  };

  private handleNodeDragEnd = async (e: any): Promise<void> => {
    // Handle node drag end
  };

  private handleDrop = async (e: any): Promise<void> => {
    // Handle drop
  };

  private handleNodeDblClick = async (e: any): Promise<void> => {
    // Handle node double click
  };

  private handleMouseUp = (e: any): void => {
    // Handle mouse up
  };

  public onGraphData(data: IProps['data']): void {
    if (this.graph) {
      this.graph.data(data);
      this.onGraphRender();
    }
  }

  public onGraphRender = async (): Promise<void> => {
    if (this.graph) {
      this.graph.render();
      // this.graph.layout();
      // await onWait();
      this.graph.fitView(40);
    }
  };

  public onGraphDestroy = (): void => {
    if (this.graph) {
      this.graph.off('collapse-text:click', this.handleCollapseClick);
      this.graph.off('collapse-back:click', this.handleCollapseClick);
      this.graph.off('nodeselectchange', this.handleNodeSelectChange);
      this.graph.off('node:dragstart', this.handleNodeDragStart);
      this.graph.off('node:drag', this.handleNodeDrag);
      this.graph.off('node:dragend', this.handleNodeDragEnd);
      this.graph.off('drop', this.handleDrop);
      this.graph.off('node:dblclick', this.handleNodeDblClick);
      this.graph.off('mouseup', this.handleMouseUp);

      this.graph.clear();
      this.graph.destroy();
    }
    this.graphRef = null;
    window.removeEventListener('resize', this.debounce(this.onResize, 100));
  };

  private onResize = (): void => {
    if (this.graphRef && this.graph) {
      this.graph.changeSize(
        this.graphRef.offsetWidth,
        this.graphRef.offsetHeight,
      );
    }
  };

  private debounce(
    func: (...args: any[]) => void,
    wait: number,
  ): (...args: any[]) => void {
    let timeout: number | undefined;
    return (...args: any[]): void => {
      const later = (): void => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  }
}

const graphInstance = new ExtendGraph();
export default graphInstance;

//注册节点
export function onRegisterGraph() {
  enum Colors {
    B = '#5B8FF9',
    R = '#F46649',
    Y = '#EEBC20',
    G = '#5BD8A6',
    DI = '#A7A7A7',
  }

  /**
   * 自定义节点
   */
  G6.registerNode(
    'flow-rect',
    {
      shapeType: 'flow-rect',
      draw(cfg: any, group) {
        const { name = '', collapsed, mold = '', virtualFlag } = cfg;
        const grey = '#CED4D9';
        const rectConfig = {
          width: 200,
          height: 50,
          lineWidth: 1,
          fontSize: 12,
          fill: '#1f1f1f',
          radius: 4,
          stroke: grey,
          opacity: 1,
        };

        const nodeOrigin = {
          x: -rectConfig.width / 2,
          y: -rectConfig.height / 2,
        };

        const rect = group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x,
            y: nodeOrigin.y,
            ...rectConfig,
            cursor: 'pointer',
          },
          draggable: true,
          name: 'root-rect',
        });
        // left icon
        group.addShape('image', {
          attrs: {
            x: nodeOrigin.x + 10,
            y: nodeOrigin.y + rectConfig.height / 2 - 20,
            height: 40,
            width: 40,
            cursor: 'pointer',
            img: buding,
          },
          draggable: true,
          name: 'node1-icon',
        });
        // label title
        group.addShape('text', {
          attrs: {
            x: nodeOrigin.x + 60,
            y: nodeOrigin.y + rectConfig.height / 2 + 6,
            text: fittingString(name, 130, 14),
            fontSize: 14,
            opacity: 0.85,
            cursor: 'pointer',
            fill: '#fff',
          },
          draggable: true,
          name: 'name-shape',
        });

        if (cfg?.children && cfg?.children?.length) {
          group.addShape('rect', {
            attrs: {
              x: rectConfig.width / 2 - 8,
              y: -8,
              width: 16,
              height: 16,
              stroke: 'rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              fill: '#fff',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'collapse-back',
            modelId: cfg.id,
          });

          // collpase text
          group.addShape('text', {
            attrs: {
              x: rectConfig.width / 2,
              y: -1,
              textAlign: 'center',
              textBaseline: 'middle',
              text: collapsed ? '+' : '-',
              fontSize: 16,
              cursor: 'pointer',
              fill: 'rgba(0, 0, 0, 0.25)',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'collapse-text',
            modelId: cfg.id,
          });
        }
        return rect;
      },
      update(cfg, item) {
        const {
          level,
          status,
          name = '',
        } = cfg as {
          level: number;
          status: keyof typeof Colors;
          name: string;
        };
        const group = item.getContainer();
        let mask = group.find((ele) => ele.get('name') === 'mask-shape');
        let maskLabel = group.find(
          (ele) => ele.get('name') === 'mask-label-shape',
        );
        if (level === 0) {
          group.get('children').forEach((child) => {
            if (child.get('name')?.includes('collapse')) return;
            child.hide();
          });
          if (!mask) {
            mask = group.addShape('rect', {
              attrs: {
                x: -101,
                y: -30,
                width: 202,
                height: 60,
                opacity: 0,
                fill: Colors[status],
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'mask-shape',
            });
            maskLabel = group.addShape('text', {
              attrs: {
                fill: '#fff',
                fontSize: 20,
                x: 0,
                y: 10,
                text: name.length > 28 ? name.substr(0, 16) + '...' : name,
                textAlign: 'center',
                opacity: 0,
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'mask-label-shape',
            });
            const collapseRect = group.find(
              (ele) => ele.get('name') === 'collapse-back',
            );
            const collapseText = group.find(
              (ele) => ele.get('name') === 'collapse-text',
            );
            collapseRect?.toFront();
            collapseText?.toFront();
          } else {
            mask.show();
            maskLabel.show();
          }
          mask.animate({ opacity: 1 }, 200);
          maskLabel.animate({ opacity: 1 }, 200);
          return mask;
        } else {
          group.get('children').forEach((child) => {
            if (child.get('name')?.includes('collapse')) return;
            child.show();
          });
          mask?.animate(
            { opacity: 0 },
            {
              duration: 200,
              callback: () => mask.hide(),
            },
          );
          maskLabel?.animate(
            { opacity: 0 },
            {
              duration: 200,
              callback: () => maskLabel.hide(),
            },
          );
        }
        //@ts-ignore
        this.updateLinkPoints(cfg, group);
      },
      setState(name, value, item: any) {
        if (name === 'selected') {
          const group = item.getContainer();
          const shape = group.get('children')[0]; // 顺序根据 draw 时确定
          if (value) {
            shape.attr('stroke', 'blue');
          } else {
            shape.attr('stroke', '#CED4D9');
          }
        }
        if (name === 'collapse') {
          const group = item.getContainer();
          const collapseText = group.find(
            (e) => e.get('name') === 'collapse-text',
          );
          if (collapseText) {
            if (!value) {
              collapseText.attr({
                text: '-',
              });
            } else {
              collapseText.attr({
                text: '+',
              });
            }
          }
        }
        if (name === 'closest') {
          const group = item.getContainer();
          const collapseText = group.find((e) => e.get('name') === 'root-rect');
          if (collapseText) {
            if (!value) {
              collapseText.attr({
                fill: '#1f1f1f',
              });
            } else {
              collapseText.attr({
                fill: '#f00',
              });
            }
          }
        }
      },
      getId(cfg) {
        return cfg.id;
      },
      getAnchorPoints() {
        return [
          [0, 0.5],
          [1, 0.5],
        ];
      },
    },
    'rect',
  );

  G6.registerEdge(
    'flow-cubic',
    {
      getControlPoints(cfg: any) {
        let controlPoints = cfg.controlPoints; // 指定controlPoints
        if (!controlPoints || !controlPoints.length) {
          const { startPoint, endPoint, sourceNode, targetNode } = cfg;
          const {
            x: startX,
            y: startY,
            coefficientX,
            coefficientY,
          } = sourceNode ? sourceNode.getModel() : startPoint;
          const { x: endX, y: endY } = targetNode
            ? targetNode.getModel()
            : endPoint;
          let curveStart = (endX - startX) * coefficientX;
          let curveEnd = (endY - startY) * coefficientY;
          curveStart = curveStart > 40 ? 40 : curveStart;
          curveEnd = curveEnd < -30 ? curveEnd : -30;
          controlPoints = [
            { x: startPoint.x + curveStart, y: startPoint.y },
            { x: endPoint.x + curveEnd, y: endPoint.y },
          ];
        }
        return controlPoints;
      },
      getPath(points: { x: number; y: number }[]) {
        const path: any = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push([
          'C',
          points[1].x,
          points[1].y,
          points[2].x,
          points[2].y,
          points[3].x,
          points[3].y,
        ]);
        return path;
      },
    },
    'single-line',
  );
}

/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
const fittingString = (
  str: string,
  maxWidth: number,
  fontSize: number,
): string => {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};
