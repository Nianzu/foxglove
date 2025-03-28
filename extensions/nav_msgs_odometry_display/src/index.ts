import { ExtensionContext } from "@foxglove/extension";
import { CubePrimitive, SceneUpdate } from "@foxglove/schemas";
import { Time } from "@foxglove/schemas/schemas/typescript/Time";

type OdometryMessage = {
    header: {
        seq: number;
        stamp: Time;
        frame_id: string;
    };
    child_frame_id: string;
    pose: {
        pose: {
            position: { x: number; y: number; z: number };
            orientation: { x: number; y: number; z: number; w: number };
        };
        covariance: number[];
    };
    twist: {
        twist: {
            linear: { x: number; y: number; z: number };
            angular: { x: number; y: number; z: number };
        };
        covariance: number[];
    };
};

export function activate(extensionContext: ExtensionContext) {
    extensionContext.registerMessageConverter({
        fromSchemaName: "nav_msgs/msg/Odometry",
        toSchemaName: "foxglove.SceneUpdate",
        converter: (inputMessage: OdometryMessage): SceneUpdate => {
            const { pose } = inputMessage;
            const position = pose.pose.position;
            const orientation = pose.pose.orientation;
            const { stamp, frame_id } = inputMessage.header;

            // Use position from the odometry message
            const cubePrimitive: CubePrimitive = {
                pose: {
                    position: {
                        x: position.x,
                        y: position.y,
                        z: position.z,
                    },
                    orientation: {
                        x: orientation.x,
                        y: orientation.y,
                        z: orientation.z,
                        w: orientation.w,
                    },
                },
                size: { x: 1, y: 1, z: 1 }, // Default size for the cube representing the robot
                color: { r: 0, g: 0, b: 1, a: 1 }, // Color of the cube
            };

            const sceneUpdateMessage = {
                deletions: [],
                entities: [
                    {
                        id: "odometry-entity",
                        timestamp: stamp,
                        frame_id,
                        lifetime: { sec: 10, nsec: 0 },
                        frame_locked: false,
                        metadata: [],
                        arrows: [],
                        cubes: [cubePrimitive], // Display cube for the odometry position
                        spheres: [],
                        cylinders: [],
                        lines: [],
                        triangles: [],
                        texts: [],
                        models: [],
                    },
                ],
            };

            return sceneUpdateMessage;
        },
    });
}
