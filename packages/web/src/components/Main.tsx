import React, { useState } from "react";
import { create } from '@badminton-court-member-randomizer/lib';

export default function Main() {
    const [state, setState] = useState(create({ courtCount: 2, memberCount: 12 }));

    return <>{ JSON.stringify(members) }</>
}
