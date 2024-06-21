package com.careerquest.backend.common.cqrs.interfaces.commands;

public interface ICommandPublisher<CommandBase extends ICommand> {
    <T extends CommandBase> Object publish(T command);
}
